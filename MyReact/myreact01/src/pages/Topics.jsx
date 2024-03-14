

import { NavLink, Route, Routes, useParams } from "react-router-dom";

const contents = [
  {id:1, title:'HTML', description:'HTML 은 재미있다...ㅎㅎ'},
  {id:2, title:'JavaScript', description:'JavaScript 는 더 재미있다...ㅎㅎ'},
  {id:3, title:'React', description:'React 는 흥미롭다...ㅎㅎ'}
]

// ========================================== //

function Topic() {

  const {topic_id} = useParams();

  console.log(`** topic_id=${topic_id}`);



  let selected_item = {
    title: 'Sorry',
    description: '~~ NotFound ~~'
  }

  const find_item = contents.filter( (content) => content.id==topic_id ); //filter
  console.log(find_item)
  selected_item = find_item.length > 0 ? find_item[0] : selected_item;
  console.log(selected_item)

  return (
      <div>

          <h3>** {selected_item.title} **</h3>
          <h3>{selected_item.description}</h3> 
      </div>
  ); // return
}; //Topic

// -------------------------------------------------------

function Topics() {
  const lis = contents.map((content) => 
    <li key={content.id}><NavLink to={"/topics/"+content.id}>{content.title}</NavLink></li>
  ); //map

  return (
    <div>
      <h3>** Topics: ver02 **</h3>
      <ul>
        {/* 2) map 적용 */}
        { lis }
      </ul>
      <div>
        <Routes>
          <Route path="/:topic_id" element={<Topic />} />
        </Routes>
      </div>
    </div>
  ); //return
} //Topics


export default Topics;