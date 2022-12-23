import { ProgressBar } from 'react-loader-spinner';

export function Loader() {
  return (
    <ProgressBar
      role="alert"
      height="80"
      width="80"
      ariaLabel="progress-bar-loading"
      wrapperStyle={{ margin: 'auto' }}
      wrapperClass="progress-bar-wrapper"
      borderColor="#171e47"
      barColor="#3f51b5"
    />
  );
}
