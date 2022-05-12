import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy },
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'submit',
            comment: 'test',
            screenshot: 'data:image/png;base64,test.png',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without a type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'test',
            screenshot: 'data:image/png;base64,test.png',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without a comment', async () => {
        await expect(submitFeedback.execute({
            type: 'test',
            comment: '',
            screenshot: 'data:image/png;base64,test.png',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without a invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'test',
            comment: 'tertert',
            screenshot: 'test.png',
        })).rejects.toThrow();
    });
});