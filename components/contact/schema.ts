import { z } from 'zod'

export const FormDataSchema = z.object({
    number: z.string().nonempty('Number is required.'),
    message: z
        .string()
        .nonempty('Message is required.')
        .min(6, { message: 'Message must be at least 6 characters.' }),
    satisfied: z.string().nonempty('Satisfied is required.')

})

export const ContactFormSchema = z.object({
    name: z.string().nonempty('Name is required.'),
    email: z.string().nonempty('Email is required.').email('Invalid email.'),
    message: z
        .string()
        .nonempty('Message is required.')
        .min(6, { message: 'Message must be at least 6 characters.' })
})