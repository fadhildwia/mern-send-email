import { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import Header from "../components/Header"
import ModalAlert from "../components/ModalAlert"
import usePostUserLogout from "../hooks/usePostUserLogout"
import { useNavigate } from "react-router-dom"
import { appCookies } from "../utils/appCookies"
import ModalForm from "../components/ModalForm"
import Loading from "../components/Loading"

const events = [{ title: "Meeting", start: new Date() }]

const Home = () => {
  const navigate = useNavigate();
  const { removeCookie } = appCookies();
  const [showModalAlert, setShowModalAlert] = useState(false)
  const [showModalForm, setShowModalForm] = useState(false)

  const { mutateAsync: mutateAsyncLogout, isLoading: isLoadingLogout } = usePostUserLogout({
    onSuccess: () => {
      navigate('/login');
      removeCookie({ name: 'access_token' });
    }
  });

  return (
    <>
      <Loading isShow={isLoadingLogout} />
      <Header onClick={() => setShowModalAlert(true)} />
      <ModalAlert
        showModal={showModalAlert}
        title="Logout"
        description="Are you sure you would like to logout of your account?"
        btnTitle="Logout"
        onCancel={() => setShowModalAlert(false)}
        onSubmit={() => mutateAsyncLogout()}
      />
      <ModalForm showModal={showModalForm} onSubmit={() => {}} onClose={() => setShowModalForm(false)} />
      <div className="pt-20 sm:px-20 px-5">
        <button onClick={() => setShowModalForm(true)} className="w-[150px] bg-blue-500 h-[50px] my-3 rounded-xl cursor-pointer shadow-md hover:scale-105 hover:shadow-lg text-[#fff]">
          Create
        </button>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          weekends={false}
          events={events}
          eventContent={renderEventContent}
        />
      </div>
    </>
  )
}

export default Home

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
