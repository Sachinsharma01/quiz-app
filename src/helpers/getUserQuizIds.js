export const getUserQuizIds = (allUsers) => {
  const userName = localStorage.getItem("userName");
  return allUsers && allUsers[userName].quizIDs;
};

export const getDataFromQuizIds = (quizIds, quizIdArray) => {
  var response = [];
  if (quizIdArray !== null && quizIdArray !== undefined){
    quizIdArray.forEach((quizId) => {
      console.log(quizId);
      response.push(quizIds[quizId]);
    });
    console.log(response);
  }
  return response;
};