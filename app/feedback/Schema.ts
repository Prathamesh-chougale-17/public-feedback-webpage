// {create a schema for feeedback}
import {z} from 'zod';

export const FormSubmissionSchema = z.object({
    fullName: z.string().min(3).max(100),
    email: z.string().email(),
    phoneNumber: z.string().min(10).max(10),
    age: z.number(),
    address: z.string().min(5),
    gender: z.string(),
    feedback: z.string().min(10),
    satisfaction: z.string().min(2),
    rating: z.number().min(1).max(5),
    location: z.string().min(3),
    typeofincident: z.string().min(3),
    policestation: z.string().min(3),
    feedbacktype: z.string().min(3),
})