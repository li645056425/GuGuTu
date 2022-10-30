function getScore(kvDataList) {
  const scoreData = kvDataList.find((item) => item.key == "highestScore");
  const duration = +scoreData?.value.split("_")[1] || 0;
  const scoreNum = +scoreData?.value.split("_")[2] || 0;
  const lingzhiNum = +scoreData?.value.split("_")[3] || 0;
  return {
    duration,
    scoreNum,
    lingzhiNum,
    scoreWeight: lingzhiNum * 1000 + scoreNum + 60000 / duration,
  };
}

// 上述模板经过模板引擎编译成版本函数，可通过 olado.github.io/doT/index.html 在线获得
function getTemplate() {
  return new Promise((resolve, reject) => {
    wx.getFriendCloudStorage({
      keyList: ["highestScore"],
      success: (res) => {
        console.log("getFriendCloudStorage", res);
        const rankList = res.data
          .map((item) => ({
            avatarUrl: item.avatarUrl,
            nickname: item.nickname,
            openid: item.openid,
            ...getScore(item.KVDataList),
          }))
          .sort((item1, item2) => {
            return item2.scoreWeight - item1.scoreWeight;
          });
        const list = [...rankList, ...rankList]
          .map(
            (rankItem, index) =>
              `
            <view class="listItem ${index % 2 ? "grayBg" : ""}">
              <view class="listItemUser">
                <image class="listItemAvatar" src="${
                  rankItem.avatarUrl
                }"></image>
                <text class="listItemName" value="${rankItem.nickname}"></text>
              </view>
              <view class="listItemLingzhi">
                <image class="listItemLingzhiImg" src="openDataContext/renderFriendRankList/lingzhi.png"></image>
                <text class="listItemLingzhiNum" value="${
                  rankItem.lingzhiNum
                }"></text>
              </view>
              <view class="listItemScore">
                <image class="listItemScoreImg" src="openDataContext/renderFriendRankList/mushroom.png"></image>
                <text class="listItemScoreNum" value="${
                  rankItem.scoreNum
                }"></text>
              </view>
            </view>
          `
          )
          .join("");
        resolve(
          `<scrollview class="list" scrollY="true"> ${list} </scrollview>`
        );
      },
      fail: (err) => {
        console.error("getFriendCloudStorage", err);
        reject(err);
      },
    });
  });
}
module.exports = getTemplate;
