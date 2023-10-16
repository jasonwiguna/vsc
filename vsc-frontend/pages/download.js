import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { backendAxiosInstance } from '../services/axiosInstance';

export default function Download() {
  const router = useRouter();
  const { p, u } = router.query;

  if(p && u) {
    backendAxiosInstance({
      url: `/backend/storage/download/${p}/${u}`,
      method: 'GET',
      responseType: 'blob',
    }).then((res) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(res.data);
  
      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', 'vstream.zip'); //or any other extension
      document.body.appendChild(link);
      link.click();
  
      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }).catch((error) => {})
  }

  return (
    <div className={styles.container}>
      Starting download...
    </div>
  )
}
