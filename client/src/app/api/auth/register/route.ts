import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";
import { registerSchema } from "@/validator/authValidationSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
import bcrypt from "bcryptjs";

// Update UserPayload to include all fields
interface UserPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
  avatar?: string;
  password_reset_token?: string;
  magic_link_token?: string;
  magic_link_sent_at?: string;
  skillLevel?: "Beginner" | "Intermediate" | "Advanced";
  preferredPlayTimes?: string[];
  favoriteSports?: string[];
  location?: {
    city?: string;
    area?: string;
    coordinates?: {
      lat?: number;
      lng?: number;
    };
  };
}

connect();
export async function POST(request: NextRequest) {
  try {
    const body: UserPayload = await request.json();
    vine.errorReporter = () => new ErrorReporter();
    const validator = vine.compile(registerSchema);
    const output = await validator.validate(body);

    try {
      const user = await User.findOne({ email: output.email });
      if (user) {
        return NextResponse.json(
          {
            status: 400,
            errors: {
              email: "Email is already used.",
            },
          },
          { status: 200 }
        );
      } else {
        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        output.password = bcrypt.hashSync(output.password, salt);

        // Store all fields from output
        await User.create({
          ...output,
          password: output.password, // hashed password
        });

        return NextResponse.json(
          { status: 200, msg: "User Created successfully!" },
          { status: 200 }
        );
      }
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
  }
}