import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Transition, Dialog } from '@headlessui/react'

const AlertRetry = ({ isOpen, setIsOpen, setScore, setTime }) => {
  const navigate = useNavigate()

  function closeModal() {
    setIsOpen(false)
  }

  const handleGoToQuiz = (event) => {
    event.preventDefault()
    setIsOpen(false)
    setScore(0)
    setTime(0)
    navigate('/quiz')
  }
  
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={closeModal}
                  >
                    <span className="sr-only">Close</span>
                    <CloseIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div>
                    <div className="flex justify-center my-5">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-200 sm:mx-0 sm:h-10 sm:w-10">
                        <QuestionMarkIcon className="h-6 w-6 text-slate-600" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-center text-lg leading-6 font-medium text-gray-900">
                        Are you sure you want to start over?
                      </Dialog.Title>
                      <div className="my-2">
                        <p className="text-center text-sm text-gray-500">
                          When you restart, the recorded score disappears.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 py-2 px-4 flex justify-end">
                  <button
                    type="button"
                    className="mr-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 py-1 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleGoToQuiz}
                  >
                    Retry
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>  
  )
}

export default AlertRetry