"use client";

export function LightModeBackground() {
  return (

    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">

      <div
        className="absolute -top-20 -left-20 w-[650px] h-[650px] rounded-full bg-rose-300/60 blur-[120px] animate-[drift_15s_ease-in-out_infinite]"
        style={
          {
            "--translate-x": "15%",
            "--translate-y": "15%",
          } as React.CSSProperties
        }
      />


      <div
        className="absolute -bottom-20 -right-20 w-[750px] h-[750px] rounded-full bg-amber-200/70 blur-[140px] animate-[drift_20s_ease-in-out_infinite]"
        style={
          {
            "--translate-x": "-20%",
            "--translate-y": "-20%",
          } as React.CSSProperties
        }
      />


      <div
        className="absolute top-[25%] left-[10%] w-[550px] h-[550px] rounded-full bg-orange-200/50 blur-[110px] animate-pulse"
        style={{ animationDuration: "7s" }}
      />
    </div>
  );
}
