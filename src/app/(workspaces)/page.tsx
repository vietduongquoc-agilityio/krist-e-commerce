'use client';

import { Button } from '@/components/commons/Button';

export default function LandingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to the Landing Page</h1>

      <Button variant="solid" className="mb-4">
        Click Me
      </Button>
      <Button variant="ghost" className="mb-4">
        Click Me (Ghost)
      </Button>
      <Button className="mb-4 bg-coralRed">Click Me (Light)</Button>
    </div>
  );
}
