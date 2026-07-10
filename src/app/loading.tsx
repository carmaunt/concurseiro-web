import { Skeleton } from "@/components/Skeleton";

export default function LoadingPage() {
  return (
    <main className="container section">
      <Skeleton variant="featured" />
      <div style={{ marginTop: 16 }}>
        <Skeleton variant="card" count={2} />
      </div>
    </main>
  );
}
