import * as yup from 'yup'

export const sizeSchema = yup.number().integer('Contains illegal characters').positive('Size must be over 0').max(100)
    .nullable()

export const titleSchema = yup.string().required().trim().min(2)
    .max(50)

export const descriptionSchema = yup.string().nullable()

export const taskSchema = yup.object().shape({
    title: titleSchema,
    size: sizeSchema,
    description: descriptionSchema,
})
