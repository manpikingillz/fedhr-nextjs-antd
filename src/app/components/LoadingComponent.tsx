import { Spin } from 'antd';

export default function LoadingComponent() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spin size="large" />;
    </div>
  );
}
