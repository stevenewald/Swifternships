export default function Avatar(props: { size: number, logoURL:string }) {
  return (
    <div className="pl-1 pt-1 flex items-center gap-x-6 rounded-full">
      <img
        className={`object-cover w-${props.size} h-${props.size} rounded-full ring ring-gray-300`}
        src={props.logoURL}
        alt=""
      />
    </div>
  );
}
