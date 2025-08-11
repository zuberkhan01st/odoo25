import vine from "@vinejs/vine";

export const registerSchema = vine.object({
  name: vine.string().minLength(2),
  email: vine.string().email(),
  password: vine.string(),
  avatar: vine.string().optional(),
  password_reset_token: vine.string().optional(),
  magic_link_token: vine.string().optional(),
  magic_link_sent_at: vine.string().optional(),
  skillLevel: vine.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
  preferredPlayTimes: vine.array(vine.string()).optional(),
  favoriteSports: vine.array(vine.string()).optional(),
  location: vine.object({
    city: vine.string().optional(),
    area: vine.string().optional(),
    coordinates: vine.object({
      lat: vine.number().optional(),
      lng: vine.number().optional(),
    }).optional(),
  }).optional(),
});

export const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(6),
});
