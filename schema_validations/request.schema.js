import Joi from "joi";

const prompt = Joi.string();

export const SCHEMA_PROMPT = Joi.object({
    prompt: prompt.required()
})


