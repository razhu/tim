const { TOPIC_TIM_MODEL, TOPIC_TIM_SINGLE_MODEL } = process.env;

export class TOPICS {
  public static TIM_MODEL = TOPIC_TIM_MODEL || 'TimModel';
  public static TIM_SINGLE_MODEL = TOPIC_TIM_SINGLE_MODEL || 'TimSingleModel';
}
