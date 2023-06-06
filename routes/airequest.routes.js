import { Router } from 'express';
import { validatePrompt } from '../middlewares/errors.middlewares.js';
import { SCHEMA_PROMPT } from '../schema_validations/request.schema.js';
import { openai } from '../libs/openai.js';
const apiRoutes = new Router();


apiRoutes.get('/', async (req, res, next) => {
    res.json({
        result: 'ok',
    })
})

apiRoutes.post('/',
    validatePrompt(SCHEMA_PROMPT, 'body'),
    async (req, res, next) => {

        try {
            const { prompt } = req.body

            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt+',responde resumido si la pregunta es dirigida a temas de literatura y bibliotecas.',
                max_tokens: 50
            });
            console.log(completion.data.choices);
            res.status(200).json({ result: completion.data.choices });

        } catch (e) {
            handleErroRequest(e, res)
        }
    })

export default apiRoutes;

const handleErroRequest = (error, res) => {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
    } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        res.status(500).json({
            error: {
                message: 'An error occurred during your request.',
            }
        });
    }
} 