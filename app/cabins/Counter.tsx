"use client";

import { useState } from "react";

export default function Counter({ users }) {
  const [count, setCount] = useState(0);

  console.log(users[0]);

  return (
    <button onClick={() => setCount(count + 1)}>{users[count].name}</button>
  );
}
