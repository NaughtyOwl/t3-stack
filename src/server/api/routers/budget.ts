import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const budgetRouter = createTRPCRouter({

    myBudgets: publicProcedure.input(z.object({
        searchTerm : z.string()
    })
    ).query( async ({input, ctx}) => {
        return ctx.prisma.budget.findMany({
            where : {
                product : {
                    startsWith: input.searchTerm
                }
            },
            orderBy:[{
                transaction_date : 'desc'
            }]
        })
    }),


    edit : protectedProcedure.input( z.object({
        
        id : z.string(), 
        product : z.string(),
        paid : z.number(),
        change : z.number(),
        amount : z.number(),
        remarks : z.string(),
        location : z.string(),
        category : z.string(),
        updated_date: z.date(),
        transaction_date: z.date(),

    })).mutation(async ({input, ctx}) => {
        if (input.change > input.paid) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'The server cannot or will not process the request due to something that is perceived to be a client error.',
                cause: 'Chnage should not be greater than the paid amount',
            })
        }

        const budget = await ctx.prisma.budget.update({
                where: {
                    id: input.id,
                },
                data : {
                    product :  input.product,
                    paid :  input.paid,
                    change : input.change,
                    amount : input.amount,
                    remarks : input.remarks,
                    location : input.location,
                    category : input.category,
                    updated_date: input.updated_date,
                    transaction_date: input.transaction_date,
                }
            }
        )
        
        return budget
    }),

    deleteBudget : protectedProcedure.input(z.object({
        id : z.string(), 
    })).mutation(async ({input, ctx}) => {
        const budget = await ctx.prisma.budget.delete({
                where: {
                    id: input.id,
                },
            }
        )
        
        return budget
    }),

    create: protectedProcedure.input(
        z.object({
            id : z.string(), 
            product : z.string(),
            paid : z.number(),
            change : z.number(),
            amount : z.number(),
            remarks : z.string(),
            location : z.string(),
            auto_remarks: z.boolean(),
            category : z.string(),
            created_date: z.date(),
            updated_date: z.date(),
            transaction_date: z.date(),
        })
    ).mutation(async ({input, ctx}) => {

        if (input.change > input.paid) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'The server cannot or will not process the request due to something that is perceived to be a client error.',
                cause: 'Chnage should not be greater than the paid amount',
            })
        }

        let actualRemarks = ''

        if (input.auto_remarks) {
           actualRemarks = `I obtain ${input.product} in ${input.location} paid ${input.paid} and I recieved a change of ${input.change}`
        } else {
            actualRemarks = input.remarks
        }

        const budgets = await ctx.prisma.budget.create({
            data: {
                id : input.id,
                user_id : ctx.auth.userId ??  '',
                product :  input.product,
                paid :  input.paid,
                change : input.change,
                amount : input.amount,
                remarks : actualRemarks,
                location : input.location,
                auto_remarks: input.auto_remarks,
                category : input.category,
                created_date: input.created_date,
                updated_date: input.updated_date,
                created_by  : ctx.auth.userId ??  '',
                transaction_date : input.transaction_date,
            }
        })

        return budgets
    })


});
