import type { Heritage } from '@/types'

// 34 省代表非遗图鉴（每省 1 项代表，MVP 阶段）
// icon 字段对应 src/components/HeritageIcon.tsx 中的镂空线性图标 key
export const HERITAGES: Heritage[] = [
  { id: 'heritage_beijing_1', name: '京剧', province: '北京', category: '传统戏剧', level: 'world', icon: 'mask', shortDesc: '国粹，唱念做打融一体', longDesc: '京剧形成于清代，融合徽调、汉调，以二黄、西皮为主调，行当分生旦净丑，2010年列入联合国非遗名录。', rarity: 'epic' },
  { id: 'heritage_tianjin_1', name: '相声', province: '天津', category: '曲艺', level: 'national', icon: 'fan', shortDesc: '说学逗唱，津门幽默', longDesc: '相声起源于华北，以说学逗唱为基本功，天津是其重要发祥地，以讽刺幽默见长。', rarity: 'rare' },
  { id: 'heritage_hebei_1', name: '吴桥杂技', province: '河北', category: '传统体育、游艺与杂技', level: 'national', icon: 'acrobat', shortDesc: '杂技之乡，惊险奇绝', longDesc: '吴桥被誉为"杂技之乡"，其杂技艺术历史悠久，技艺精湛，涵盖蹬、耍、戏、手技等多种门类。', rarity: 'rare' },
  { id: 'heritage_shanxi_1', name: '平遥推光漆器', province: '山西', category: '传统技艺', level: 'national', icon: 'lacquer', shortDesc: '手掌推光，光泽如镜', longDesc: '平遥推光漆器以手掌推光出名，漆面光亮如镜，配色典雅，是山西平遥的传统手工技艺。', rarity: 'rare' },
  { id: 'heritage_neimenggu_1', name: '马头琴音乐', province: '内蒙古', category: '传统音乐', level: 'world', icon: 'horse', shortDesc: '草原之声，苍茫悠远', longDesc: '马头琴是蒙古族代表性拉弦乐器，琴首雕马头，音色苍茫，2003年随蒙古族长调民歌艺术列入联合国非遗。', rarity: 'epic' },
  { id: 'heritage_liaoning_1', name: '岫岩玉雕', province: '辽宁', category: '传统美术', level: 'national', icon: 'jade', shortDesc: '玉石之乡，巧夺天工', longDesc: '岫岩玉雕以岫岩玉为材，造型生动，工艺精湛，是中国玉雕艺术的重要流派。', rarity: 'common' },
  { id: 'heritage_jilin_1', name: '朝鲜族农乐舞', province: '吉林', category: '传统舞蹈', level: 'world', icon: 'drum', shortDesc: '象帽飘舞，丰收欢歌', longDesc: '朝鲜族农乐舞集舞、乐、戏于一体，舞者旋转象帽彩带，2009年列入联合国非遗名录。', rarity: 'epic' },
  { id: 'heritage_heilongjiang_1', name: '赫哲族伊玛堪', province: '黑龙江', category: '民间文学', level: 'world', icon: 'scroll', shortDesc: '渔猎史诗，口传千年', longDesc: '伊玛堪是赫哲族口头说唱史诗，讲述英雄征战与部落兴衰，2011年列入联合国非遗名录。', rarity: 'epic' },
  { id: 'heritage_shanghai_1', name: '沪剧', province: '上海', category: '传统戏剧', level: 'national', icon: 'mask', shortDesc: '申城乡音，海派戏曲', longDesc: '沪剧源于江南民歌，用上海方言演唱，贴近都市生活，是海派文化代表。', rarity: 'common' },
  { id: 'heritage_jiangsu_1', name: '苏绣', province: '江苏', category: '传统美术', level: 'national', icon: 'needle', shortDesc: '四大名绣，针法精绝', longDesc: '苏绣以苏州为中心，针法活泼，色彩雅致，与湘绣、蜀绣、粤绣并称中国四大名绣。', rarity: 'rare' },
  { id: 'heritage_zhejiang_1', name: '龙泉青瓷', province: '浙江', category: '传统技艺', level: 'world', icon: 'porcelain', shortDesc: '千峰翠色，青如玉', longDesc: '龙泉青瓷以粉青、梅子青闻名，2009年列入联合国非遗名录，是陶瓷类首个世界非遗。', rarity: 'epic' },
  { id: 'heritage_anhui_1', name: '徽剧', province: '安徽', category: '传统戏剧', level: 'national', icon: 'mask', shortDesc: '京剧之源，徽班进京', longDesc: '徽剧是京剧前身，乾隆年间徽班进京促成京剧形成，唱腔高亢，武戏见长。', rarity: 'rare' },
  { id: 'heritage_fujian_1', name: '福建土楼营造技艺', province: '福建', category: '传统技艺', level: 'world', icon: 'house', shortDesc: '客家圆楼，聚族而居', longDesc: '福建土楼以夯土筑就，圆形方形体量宏大，2020年营造技艺列入联合国非遗名录。', rarity: 'epic' },
  { id: 'heritage_jiangxi_1', name: '景德镇手工制瓷', province: '江西', category: '传统技艺', level: 'national', icon: 'porcelain', shortDesc: '瓷都千年，白如玉', longDesc: '景德镇制瓷逾千年，以青花、粉彩、玲珑、颜色釉"四大名瓷"著称。', rarity: 'rare' },
  { id: 'heritage_shandong_1', name: '潍坊风筝', province: '山东', category: '传统技艺', level: 'national', icon: 'kite', shortDesc: '纸鸢之乡，扎绘精巧', longDesc: '潍坊风筝工艺精湛，造型多样，每年国际风筝节闻名世界。', rarity: 'common' },
  { id: 'heritage_henan_1', name: '少林功夫', province: '河南', category: '传统体育、游艺与杂技', level: 'national', icon: 'martial', shortDesc: '禅武合一，天下武功', longDesc: '少林功夫源于嵩山少林寺，融禅于武，以拳法、兵器、硬功著称。', rarity: 'epic' },
  { id: 'heritage_hubei_1', name: '汉绣', province: '湖北', category: '传统美术', level: 'national', icon: 'needle', shortDesc: '楚绣遗韵，色彩浓烈', longDesc: '汉绣承楚绣传统，以"平金夹绣"为特色，色彩浓艳，构图饱满。', rarity: 'common' },
  { id: 'heritage_hunan_1', name: '湘绣', province: '湖南', category: '传统美术', level: 'national', icon: 'needle', shortDesc: '四大名绣，鬅毛针法', longDesc: '湘绣以湖南长沙为中心，独创鬅毛针，绣虎栩栩如生，列四大名绣之一。', rarity: 'rare' },
  { id: 'heritage_guangdong_1', name: '粤剧', province: '广东', category: '传统戏剧', level: 'world', icon: 'mask', shortDesc: '南国红豆，梆黄声腔', longDesc: '粤剧用粤语演唱，唱腔以梆黄为主，2009年列入联合国非遗名录，有"南国红豆"之称。', rarity: 'epic' },
  { id: 'heritage_guangxi_1', name: '壮族霜降节', province: '广西', category: '民俗', level: 'world', icon: 'festival', shortDesc: '壮乡歌圩，庆丰收', longDesc: '壮族霜降节是庆丰收的传统节庆，与二十四节气相关，列入联合国非遗。', rarity: 'rare' },
  { id: 'heritage_hainan_1', name: '黎族传统纺染织绣', province: '海南', category: '传统技艺', level: 'world', icon: 'textile', shortDesc: '黎锦瑰宝，海上丝路', longDesc: '黎锦是海南黎族纺织技艺，被誉为中国棉纺织"活化石"，2009年列入联合国非遗名录。', rarity: 'epic' },
  { id: 'heritage_chongqing_1', name: '川江号子', province: '重庆', category: '传统音乐', level: 'national', icon: 'wave', shortDesc: '峡江船歌，号子铿锵', longDesc: '川江号子是长江三峡船工号子，曲调高亢，节奏鲜明，是水上劳动音乐代表。', rarity: 'common' },
  { id: 'heritage_sichuan_1', name: '川剧', province: '四川', category: '传统戏剧', level: 'national', icon: 'mask', shortDesc: '变脸绝技，吐火惊鸿', longDesc: '川剧以变脸、吐火、滚灯等绝活闻名，唱腔丰富，是巴蜀文化代表。', rarity: 'epic' },
  { id: 'heritage_guizhou_1', name: '侗族大歌', province: '贵州', category: '传统音乐', level: 'world', icon: 'song', shortDesc: '多声部和声，无指挥', longDesc: '侗族大歌是无指挥、无伴奏的多声部合唱，2009年列入联合国非遗名录。', rarity: 'epic' },
  { id: 'heritage_yunnan_1', name: '傣族泼水节', province: '云南', category: '民俗', level: 'national', icon: 'water', shortDesc: '水的祝福，辞旧迎新', longDesc: '泼水节是傣族新年，以泼水祈福，源于南传上座部佛教传统。', rarity: 'rare' },
  { id: 'heritage_xizang_1', name: '藏戏', province: '西藏', category: '传统戏剧', level: 'world', icon: 'mask', shortDesc: '雪域戏剧，面具千年', longDesc: '藏戏戴面具表演，唱腔高亢，2009年列入联合国非遗名录，有"阿吉拉姆"之称。', rarity: 'epic' },
  { id: 'heritage_shaanxi_1', name: '陕北民歌', province: '陕西', category: '传统音乐', level: 'national', icon: 'song', shortDesc: '黄土高原，信天游', longDesc: '陕北民歌高亢悠长，以信天游为代表，《兰花花》《赶牲灵》传唱至今。', rarity: 'common' },
  { id: 'heritage_gansu_1', name: '环县道情皮影', province: '甘肃', category: '传统戏剧', level: 'national', icon: 'shadow', shortDesc: '黄土皮影，道情唱腔', longDesc: '环县道情皮影戏融合道情音乐与皮影表演，是陇东民间艺术瑰宝。', rarity: 'rare' },
  { id: 'heritage_qinghai_1', name: '热贡艺术', province: '青海', category: '传统美术', level: 'world', icon: 'thangka', shortDesc: '唐卡壁画，彩绘佛国', longDesc: '热贡艺术以唐卡、壁画、堆绣为主，2009年列入联合国非遗名录。', rarity: 'epic' },
  { id: 'heritage_ningxia_1', name: '回族山花', province: '宁夏', category: '传统音乐', level: 'national', icon: 'flower', shortDesc: '花儿之乡，山歌漫野', longDesc: '"花儿"是流传于西北的山歌形式，宁夏六盘山花儿独具特色。', rarity: 'common' },
  { id: 'heritage_xinjiang_1', name: '木卡姆艺术', province: '新疆', category: '传统音乐', level: 'world', icon: 'song', shortDesc: '维吾尔瑰宝，套曲集大成', longDesc: '十二木卡姆是维吾尔族大型套曲，集歌、舞、乐于一体，2005年列入联合国非遗名录。', rarity: 'epic' },
  { id: 'heritage_xianggang_1', name: '长洲太平清醮', province: '香港', category: '民俗', level: 'national', icon: 'festival', shortDesc: '飘色巡游，祈福平安', longDesc: '长洲太平清醮是香港长洲岛传统节庆，含飘色巡游、抢包山等活动。', rarity: 'common' },
  { id: 'heritage_aomen_1', name: '道教科仪音乐', province: '澳门', category: '传统音乐', level: 'national', icon: 'song', shortDesc: '道教梵音，中西交融', longDesc: '澳门道教科仪音乐融合岭南与西洋元素，是澳门重要非遗。', rarity: 'common' },
  { id: 'heritage_taiwan_1', name: '布袋戏', province: '台湾', category: '传统戏剧', level: 'national', icon: 'puppet', shortDesc: '掌中戏偶，十指乾坤', longDesc: '布袋戏又称掌中戏，以手掌操偶，唱念做打俱全，是闽台共有戏曲形式。', rarity: 'rare' },
]

export const HERITAGE_BY_ID: Record<string, Heritage> = HERITAGES.reduce(
  (acc, h) => {
    acc[h.id] = h
    return acc
  },
  {} as Record<string, Heritage>,
)
