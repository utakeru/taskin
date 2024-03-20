function fillZero(num: number) {
  return num < 10 ? '0' + num : num;
}

export function TimeDisplay({ seconds }: { seconds: number }) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return (
    <div>
      {fillZero(min)}:{fillZero(sec)}
    </div>
  );
}
