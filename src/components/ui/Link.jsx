// Link para as rotas por hash. Aceita className para parecer botão (btn btn--primary).
export default function Link({ to, children, ...rest }) {
  return (
    <a href={`#${to}`} {...rest}>
      {children}
    </a>
  );
}
