import AttendanceModel, { IAttendanceDocument } from './attendance.model';
import { IAttendance, AttendanceStatus } from './attendance.interface';

export class AttendanceRepository {
  // Get today's attendance record for an employee
  async findTodayByEmployee(employeeId: string): Promise<IAttendanceDocument | null> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return AttendanceModel.findOne({
      employeeId,
      date: { $gte: today, $lt: tomorrow },
    });
  }

  // Create a new attendance record
  async create(data: Partial<IAttendance>): Promise<IAttendanceDocument> {
    return AttendanceModel.create(data);
  }

  // Update attendance record
  async update(
    id: string,
    data: Partial<IAttendance>
  ): Promise<IAttendanceDocument | null> {
    return AttendanceModel.findByIdAndUpdate(id, data, { new: true });
  }

  // Get attendance history for an employee with pagination
  async findByEmployee(
    employeeId: string,
    startDate?: Date,
    endDate?: Date,
    page: number = 1,
    limit: number = 10
  ): Promise<{ records: IAttendanceDocument[]; total: number }> {
    const query: any = { employeeId };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = startDate;
      if (endDate) query.date.$lte = endDate;
    }

    const [records, total] = await Promise.all([
      AttendanceModel.find(query)
        .sort({ date: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      AttendanceModel.countDocuments(query),
    ]);

    return { records, total };
  }

  // Get attendance summary (present, absent, late, leave counts)
  async getSummary(
    employeeId: string,
    year: number,
    month: number
  ): Promise<Record<string, number>> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const result = await AttendanceModel.aggregate([
      {
        $match: {
          employeeId: new (require('mongoose').Types.ObjectId)(employeeId),
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const summary: Record<string, number> = {
      [AttendanceStatus.PRESENT]: 0,
      [AttendanceStatus.ABSENT]: 0,
      [AttendanceStatus.LATE]: 0,
      [AttendanceStatus.LEAVE]: 0,
    };

    result.forEach((item) => {
      summary[item._id] = item.count;
    });

    return summary;
  }

  // Find attendance by ID
  async findById(id: string): Promise<IAttendanceDocument | null> {
    return AttendanceModel.findById(id);
  }
}