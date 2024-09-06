import * as Sc from './styles';

export default function Button({ plus, title, mobileTextHidden, ...rest }) {
  return (
    <Sc.Button
      {...rest}
    >
      {plus && <Sc.Plus />}
      <Sc.Title hidden={mobileTextHidden}>
        {title}
      </Sc.Title>
    </Sc.Button>
  );
}
