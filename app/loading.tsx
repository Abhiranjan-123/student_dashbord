export default function Loading() {
  return (
    <div className="grid grid-cols-4 gap-4 p-6">
      
      {[1,2,3,4].map((i) => (
        <div
          key={i}
          className="h-48 rounded-3xl bg-zinc-800 animate-pulse"
        />
      ))}

    </div>
  )
}