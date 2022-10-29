let dataDemo = [
  /*
        {
            rankScore: 0,
            avatarUrl: '',
            nickname: '',
        },
        */
];
const maxCount = 1;
for (let i = 0; i < maxCount; ++i) {
  let item = {};
  item.rankScore = Math.floor(Math.random() * 500);
  item.avatarUrl = "openDataContext/render/avatar.png";
  item.nickname = "Player_" + i;
  dataDemo.push(item);
}
dataDemo.sort((a, b) => b.rankScore - a.rankScore);

module.exports = dataDemo;
