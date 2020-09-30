import * as yup from 'yup'

export const sizeSchema = yup.number().integer().positive().max(10)
    .nullable()

export const titleSchema = yup.string().trim().required()

export const contentSchema = yup.string().trim()

export const taskSchema = yup.object().shape({
    title: titleSchema,
    size: sizeSchema,
})
