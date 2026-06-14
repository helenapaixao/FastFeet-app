/**
 * Optional<T, K>: torna as chaves K de T opcionais, mantendo o resto obrigatório.
 *
 * Ex: Optional<UserProps, "createdAt"> => createdAt vira opcional no create().
 */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
