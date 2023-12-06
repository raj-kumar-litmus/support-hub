interface Props {
  propOne: number;
  propTwo: number;
  height: string;
  bgColorOne: string;
  bgColorTwo: string;
  containerClassName: string;
}

const LinearGauge = (props: Props) => {
  return (
    <div className={`flex ${props.containerClassName}`}>
      <span
        className={`flex items-center justify-center rounded-l-3xl w-[${Math.round(
          (Number(props.propOne) /
            (Number(props.propOne) + Number(props.propTwo))) *
            100,
        )}%] border-solid border-r-4 border-white h-[${props.height}] ${
          props.bgColorOne
        }`}
      >
        {Number(props.propOne)}
      </span>
      <span
        className={`flex items-center justify-center rounded-r-3xl w-[${Math.round(
          (Number(props.propTwo) /
            (Number(props.propOne) + Number(props.propTwo))) *
            100,
        )}%] h-[${props.height}] ${props.bgColorTwo}`}
      >
        {Number(props.propTwo)}
      </span>
    </div>
  );
};

export default LinearGauge;
