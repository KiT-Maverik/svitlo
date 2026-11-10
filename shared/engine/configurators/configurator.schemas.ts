export const configurator_Modes = ['config', 'props'] as const;
export type Configurator_Mode = (typeof configurator_Modes)[number];
