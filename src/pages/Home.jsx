import SearchForm from '../components/SearchForm'
import ActivityList from '../components/ActivityList'

const Home = ({ onSearch, activities, loading, error, searchParams }) => {
  return (
    <>
      <SearchForm 
        initialDate={searchParams.date}
        initialPeople={searchParams.people}
        onSearch={onSearch}
      />
      <ActivityList 
        activities={activities}
        loading={loading}
        error={error}
        searchParams={searchParams}
      />
    </>
  )
}

export default Home