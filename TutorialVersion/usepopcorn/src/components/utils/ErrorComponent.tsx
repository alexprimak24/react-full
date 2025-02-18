import React from "react";

interface ErrorProps {
  message: string;
}
export default function ErrorComponent({ message }: ErrorProps) {
  return <p className='error'>{message}</p>;
}
