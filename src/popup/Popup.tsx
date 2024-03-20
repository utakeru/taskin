import { Timer } from '../app/features/timer/Timer';

const Popup = () => {
  document.body.className = 'w-[30rem] h-[15rem]';

  return (
    <>
      <div className="flex justify-center mt-2 text-base">Taskin</div>
      <div className="flex justify-center">
        <Timer />
      </div>
    </>
  );
};

export default Popup;
