import { useEffect, useState } from "react"


interface Data {
    id: number,
    question: string,
    options: string[],
    answer: string
  }

const TestSearch = () => {
    const [search, setSearch] = useState<string>('')
  const [data, setData] = useState<Data[]>([])
  const [hint, setHint] = useState<Data[]>([])
  const [showData, setShowData] = useState<boolean>(false)

  useEffect(() => {
    const filteredData = Mockdata.filter(x => x.question.toLowerCase().trim().includes(search.toLowerCase().trim()))
    if(search.toLowerCase().trim() === ""){
      setHint([])
    }
    else{
      setHint(filteredData)
    }

  },[search])

  const handleData = (id: number) => {
    setShowData(true)
    const filteredData = Mockdata.filter(x => x.id === id)
    setData(filteredData)
    setHint([])
    setSearch('')
    setShowData(true)
  }
  const Mockdata = [
      {
        "id": 1,
        "question": "Who is the president of Nigeria",
        "options": ["Buhari", "Tinubu", "Sani Abacha", "Akpabio"],
        "answer": "Tinubu"
      },
      {
        "id": 2,
        "question": "How many bones are in the human body",
        "options": ["100", "250", "206", "300"],
        "answer": "206"
      },
      {
        "id": 3,
        "question": "Which among the following is not a type of pollution",
        "options": ["Air", "Water", "Noise", "Gas"],
        "answer": "Gas"
      },
      {
        "id": 4,
        "question": "Who is the current president of the United States",
        "options": ["Bill Gates", "George Washington", "Joe Biden", "Donald Trump"],
        "answer": "Joe Biden"
      }
    ]

  return (
    <div>
        <div className="logo text-[50px]">movieHub</div>
        <div className='w-full max-w-[700px] mx-auto p-[10px] h-auto gap-[20px] flex flex-col items-center justify-center'>
          <input type="text" value={search} className="border-none w-full p-[10px] outline rounded-full outline-[#e2e2e2] outline-2 focus:outline-[#8cc0f5]" placeholder='Search...' name="search" id="SEARCH" onChange={e => setSearch(e.target.value)}/>
          <div className="self-start">
            {hint.map(c => <p onClick={() => handleData(c.id)}>{c.question}</p>)}
          </div>
        {showData && 
          <div className="result bg-[#fbfbfb] p-[10px] w-full min-h-[300px]">
            <table className='p-[10px] border-spacing-5'>
              <thead className='text-left'>
                <tr className="border-[1px] border-[#e2e2e2]">
                  <th className="p-[10px] border-[1px] border-[#e2e2e2]">S/N</th>
                  <th className="p-[10px] border-[1px] border-[#e2e2e2]">Question</th>
                  <th className="p-[10px] border-[1px] border-[#e2e2e2]">Options</th>
                  <th className="p-[10px] border-[1px] border-[#e2e2e2]">Answer</th>
                </tr>
              </thead>
              <tbody>
                {data.map(data => {return  <tr key={data.id}>
                  <td className="p-[10px] border-[1px] border-[#e2e2e2]">{data.id}</td>
                  <td className="p-[10px] border-[1px] border-[#e2e2e2]">{data.question}</td>
                  <td className="p-[10px] border-[1px] border-[#e2e2e2]">{data.options.join(' ')}</td>
                  <td className="p-[10px] border-[1px] border-[#e2e2e2]">{data.answer}</td>
                  </tr>
               })}
              </tbody>
            </table>
          </div>}
        </div>
    </div>
  )
}

export default TestSearch
