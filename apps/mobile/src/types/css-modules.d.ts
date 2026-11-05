/** Host-side ambient declaration for textbook and shared CSS Modules. */
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}
