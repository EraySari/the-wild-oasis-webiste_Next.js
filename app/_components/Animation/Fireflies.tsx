export default function FirefliesCSS() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 60 }).map((_, i) => (
        <span
          key={i}
          className={`firefly`}
          style={{
            left: `${Math.random() * 95}%`,
            top: `${Math.random() * 95}%`,
            animationDelay: `${Math.random() * 1}s`,
            animationDuration: `${12 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}
