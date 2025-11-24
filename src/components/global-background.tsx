'use client';

import dynamic from 'next/dynamic';

const Threads = dynamic(() => import('@/components/threads-background'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 w-full h-full bg-background -z-10" />,
});

export default function GlobalBackground() {
    return (
        <div className="absolute inset-0 w-full h-full bg-background -z-10">
            <Threads
              color={[0.4, 0.7, 0.9]}
              amplitude={1.2}
              distance={0.3}
              enableMouseInteraction
            />
        </div>
    );
}
