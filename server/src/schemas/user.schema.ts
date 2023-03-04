import {z} from 'zod'
export const User = z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(8),
})