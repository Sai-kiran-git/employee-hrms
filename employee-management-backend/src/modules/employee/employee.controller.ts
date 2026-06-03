import { Request, Response } from 'express';
import { EmployeeService } from './employee.service';

const employeeService = new EmployeeService();

export class EmployeeController {
    async createEmployee(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const employee = await employeeService.createEmployee(
                req.body
            );

            res.status(201).json({
                success: true,
                message: 'Employee created successfully',
                data: employee,
            });
        } catch (err: any) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }

    async getEmployees(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const employees =
                await employeeService.getEmployees();

            res.status(200).json({
                success: true,
                data: employees,
            });
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }

    async getEmployee(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const id = String(req.params.id);

            const employee = await employeeService.getEmployee(id);

            res.status(200).json({
                success: true,
                data: employee,
            });
        } catch (err: any) {
            res.status(404).json({
                success: false,
                message: err.message,
            });
        }
    }

    async updateEmployee(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const id = String(req.params.id);

            const employee =
                await employeeService.updateEmployee(
                    id,
                    req.body
                );

            res.status(200).json({
                success: true,
                message: 'Employee updated successfully',
                data: employee,
            });
        } catch (err: any) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }

    async deleteEmployee(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const id = String(req.params.id);

            await employeeService.deleteEmployee(id);

            res.status(200).json({
                success: true,
                message: 'Employee deleted successfully',
            });
        } catch (err: any) {
            res.status(404).json({
                success: false,
                message: err.message,
            });
        }
    }
}