export default function Avatar(props: { size: number }) {
  return (
    <div className="flex items-center gap-x-6">
      <img
        className={`object-cover w-${props.size} h-${props.size} rounded-full ring ring-gray-300 dark:ring-gray-600`}
        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
        alt=""
      />
    </div>
  );
}
