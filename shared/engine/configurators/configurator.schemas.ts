export const configurator_Modes = ['config', 'data'] as const;
export type Configurator_Mode = (typeof configurator_Modes)[number];
