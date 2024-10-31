import { useRef, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import Header from "../components/Header"
import ModalAlert from "../components/ModalAlert"
import usePostUserLogout from "../hooks/usePostUserLogout"
import { useNavigate } from "react-router-dom"
import { appCookies } from "../utils/appCookies"
import ModalForm, { FormValues, IDataModalForm, initDataModalForm } from "../components/ModalForm"
import Loading from "../components/Loading"
import useGetSendEmailList from "../hooks/useGetSendEmailList"
import usePostSendEmail from "../hooks/usePostSendEmail"
import { useQueryClient } from "react-query"
import { EventClickArg } from "@fullcalendar/core"
import usePutModifySendEmail from "../hooks/usePutModifySendEmail"
import useDeleteSendEmailById from "../hooks/useDeleteSendEmail"

const Home = () => {
  const navigate = useNavigate()
  const { removeCookie } = appCookies()
  const queryClient = useQueryClient();
  let calendarRef = useRef<FullCalendar>(null)

  const [showModalAlert, setShowModalAlert] = useState(false)
  const [showModalForm, setShowModalForm] = useState<IDataModalForm>(initDataModalForm)
  const [events, setEvents] = useState([{}])

  const { isLoading: isLoadingSendEmailList } = useGetSendEmailList({
    options: {
      onSuccess: (res) => {
        const data = res.map((item) => ({
          ...item,
          id: item._id,
          title: item.recipientEmail,
          start: new Date(item.scheduledDate),
        }))

        setEvents(data)
      },
    },
  })

  const { mutateAsync: mutateAsyncLogout, isLoading: isLoadingLogout } =
    usePostUserLogout({
      onSuccess: () => {
        navigate("/login")
        removeCookie({ name: "access_token" })
      },
      onError: () => {
        navigate("/login")
        removeCookie({ name: "access_token" })
      }
    })

  const { mutate: mutateSendEmail, isLoading: isLoadingSendEmail } =
    usePostSendEmail({
      onSuccess: (res) => {
        queryClient.invalidateQueries(['useGetSendEmailList']);
        setShowModalForm(initDataModalForm)
      },
    })

  const { mutate: mutateModifySendEmail, isLoading: isLoadingModifySendEmail } =
    usePutModifySendEmail({
      onSuccess: () => {
        queryClient.invalidateQueries(['useGetSendEmailList']);
        setShowModalForm(initDataModalForm)
      },
    })

  const { mutate: mutateDeleteSendEMail, isLoading: isLoadingDeleteSendEMail } =
    useDeleteSendEmailById({
      onSuccess: () => {
        queryClient.invalidateQueries(['useGetSendEmailList']);
        setShowModalForm(initDataModalForm)
      },
    })

  const handleSubmit = (data: FormValues) => {
    mutateSendEmail({
      recipientEmail: data.recipientEmail,
      subject: data.subject,
      content: data.content,
      scheduledDate: data.scheduledDate
    })
  }

  const handleEventClick = (e: EventClickArg) => {
    setShowModalForm({ ...initDataModalForm, isShow: true, isNew: false, id: e.event.id })
  }

  const handleUpdate = (data: FormValues) => {
    mutateModifySendEmail({
      id: data.id as string,
      recipientEmail: data.recipientEmail,
      subject: data.subject,
      content: data.content,
      scheduledDate: data.scheduledDate
    })
  }

  const handleDelete = (data: FormValues) => {
    mutateDeleteSendEMail({ id: data.id as string })
  }

  return (
    <>
      <Loading isShow={isLoadingLogout || isLoadingSendEmailList || isLoadingSendEmail || isLoadingModifySendEmail || isLoadingDeleteSendEMail} />
      <Header onClick={() => setShowModalAlert(true)} />
      <ModalAlert
        showModal={showModalAlert}
        title="Logout"
        description="Are you sure you would like to logout of your account?"
        btnTitle="Logout"
        onCancel={() => setShowModalAlert(false)}
        onSubmit={() => mutateAsyncLogout()}
      />
      <ModalForm
        dataModalForm={showModalForm}
        onSubmit={handleSubmit}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onClose={() => setShowModalForm(initDataModalForm)}
      />
      <div className="pt-20 sm:px-20 px-5">
        <button
          onClick={() => setShowModalForm({ ...initDataModalForm, isShow: true })}
          className="w-[150px] bg-blue-500 h-[50px] my-3 rounded-xl cursor-pointer shadow-md hover:scale-105 hover:shadow-lg text-[#fff]"
        >
          Create
        </button>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          weekends={false}
          select={(e) => console.log("select", e)}
          events={events}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          dateClick={(e) => setShowModalForm({ ...initDataModalForm, isShow: true, scheduledDate: `${e.dateStr}T09:00` })}
        />
      </div>
    </>
  )
}

export default Home

function renderEventContent(eventInfo: any) {
  return (
    <div className="flex row gap-2">
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  )
}
