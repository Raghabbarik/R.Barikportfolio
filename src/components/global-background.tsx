
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
              color={[1, 1, 1]}
              amplitude={0.5}
              distance={0.2}
              enableMouseInteraction
            />
        </div>
    );
}
