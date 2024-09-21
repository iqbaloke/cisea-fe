// import "@/styles/globals.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/styles.css";
import "@/styles/custom.css";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      {/* <Template> */}
      <Component {...pageProps} />
      {/* </Template> */}
    </RecoilRoot>
  );
}
