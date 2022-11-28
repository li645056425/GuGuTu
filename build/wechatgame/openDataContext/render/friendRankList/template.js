const { getScore } = require("../../util");

// 上述模板经过模板引擎编译成版本函数，可通过 olado.github.io/doT/index.html 在线获得
function getDataTemplate() {
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
        const list = rankList
          .map(
            (rankItem, index) =>
              `
            <view class="listItem">
              <view class="listItemNo listItemNo${index}">
                <text class="listItemNoNum" value="${index + 1}"></text>
              </view>
              <view class="listItemWrap listItemWrap${index}">
                <view class="listItemUser">
                  <image class="listItemAvatar" src="${
                    rankItem.avatarUrl
                  }"></image>
                  <text class="listItemName" value="${
                    rankItem.nickname
                  }"></text>
                </view>
                <view class="listItemLingzhi">
                  <image class="listItemLingzhiImg" src="openDataContext/render/friendRankList/lingzhi.png"></image>
                  <text class="listItemLingzhiNum" value="${
                    rankItem.lingzhiNum
                  }"></text>
                </view>
                <view class="listItemScore">
                  <image class="listItemScoreImg" src="openDataContext/render/friendRankList/mushroom.png"></image>
                  <text class="listItemScoreNum" value="${
                    rankItem.scoreNum
                  }"></text>
                </view>
              </view>
            </view>
          `
          )
          .join("");
        resolve(
          getTemplate(
            `<scrollview class="list" scrollY="true"> ${list} </scrollview>`
          )
        );
      },
      fail: (err) => {
        console.error("getFriendCloudStorage", err);
        reject(err);
      },
    });
  });
}

function getTemplate(scrollview = "") {
  return `
  <view class="container">
    <view class="dialog">
      <view class="dialogWrap">
       ${scrollview}
      </view>
      <text class="title" value="好友排行榜"></text>
    </view>
  </view>
`;
}

module.exports.getTemplate = getTemplate;
module.exports.getDataTemplate = getDataTemplate;
