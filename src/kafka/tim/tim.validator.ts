import joi from 'joi';
import { TOPICS } from '../../config/topic.config';
import { OPERATIONS } from '../kafka.definition';

// TODO: Improve schema validation
const timSingleModelState = joi.object();

export const timSingleModelMessageSchema = joi
  .object()
  .keys({
    model: joi.string().valid(TOPICS.TIM_SINGLE_MODEL).required(),
    state: timSingleModelState,
    operationType: joi
      .string()
      .valid(...Object.values(OPERATIONS))
      .required(),
  })
  .options({ abortEarly: false });
