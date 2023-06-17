import { useEffect, useState } from "react";
import Header from "./components/UI/Header";
import { shortenAddress } from "./data/adapters/addressAdapters";
import MainPage from "./pages/MainPage";
import { metaMask } from "./connectors/metaMask";
import useDApp from "./hooks/useDApp";
import useCryptoHealth from "./hooks/useCryptoHealth";
import AdminPage from "./pages/AdminPage";
import DoctorPage from "./pages/DoctorPage";
import PatientPage from "./pages/PatientPage";

function App() {

  const [role, setRole] = useState<string>('');

  const {account} = useDApp();
  const {getRole} = useCryptoHealth();

  // attempt to connect eagerly on mount

  useEffect(() => {

    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask')
    })
  }, []);

  useEffect(() => {

    getRole().then((r) => {
       setRole(r as string)
    });
  }, [getRole]);

  const text = account === undefined ? 'Not Connected' : role;
  const address = account === undefined ? '' : shortenAddress(account);
  const addressHref = account === undefined ? '' : `https://mumbai.polygonscan.com/address/${account}`;

  return (
    <div className='h-screen'>
        <Header text={text} address={address} addressHref={addressHref} />
        {account === undefined ? <MainPage /> : role === 'Admin' ? <AdminPage /> : role === 'Doctor' ? <DoctorPage /> : <PatientPage />}
      </div>
  )
}

export default App;
