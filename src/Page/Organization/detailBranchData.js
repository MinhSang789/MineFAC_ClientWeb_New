const vi = `
<div className='content-section'>
          <div className='title'>* THÀNH VIÊN</div>
          <ul>
            <div className='subTitle'>- Điều kiện</div>
            <li>+ Tổng tài sản cố định trong nhà máy đạt tối thiểu $100</li>
        
            <div className='subTitle'>- Phần thưởng</div>
            <li>+ Hoa hồng F1: 10%</li>
            <li>+ Hoa hồng F2: 8%</li>
            <li>+ Hoa hồng F3: 5%</li>
          </ul>
        </div>

        <div className='content-section'>
          <div className='title'>* Hộ kinh doanh</div>
          <ul>
            <div className='subTitle'>- Điều kiện</div>
            <li>+ Tổng tài sản cố định trong nhà máy đạt tối thiểu $1,000</li>
            <li>+ Tổng tài sản cố định trong nhà máy của chi nhánh F1 đạt tối thiểu $5,000</li>
        
            <div className='subTitle'>- Phần thưởng</div>
            <li>+ Hoa hồng F1: 15%</li>
            <li>+ Hoa hồng F2: 8%</li>
            <li>+ Hoa hồng F3: 5%</li>
            <li>+ Tặng một máy khai thác $100</li>
            <li>+ Sức mạnh khai thác tăng 5%</li>
          </ul>
        </div>

        <div className='content-section'>
          <div className='title'>* Công ty</div>
          <ul>
            <div className='subTitle'>- Điều kiện</div>
            <li>+ Tổng tài sản cố định trong nhà máy đạt tối thiểu $3,000</li>
            <li>+ Tổng tài sản cố định trong nhà máy của chi nhánh F1 đạt tối thiểu $10,000</li>
        
            <div className='subTitle'>- Phần thưởng</div>
            <li>+ Hoa hồng F1: 20%</li>
            <li>+ Hoa hồng F2: 8%</li>
            <li>+ Hoa hồng F3: 5%</li>
            <li>+ Tặng một máy khai thác $500</li>
            <li>+ Sức mạnh khai thác tăng 10%</li>
          </ul>
        </div>
        
        <div className='content-section'>
          <div className='title'>* Doanh nghiệp</div>
          <ul>
            <div className='subTitle'>- Điều kiện</div>
            <li>+ Tổng tài sản cố định trong nhà máy đạt tối thiểu $10,000</li>
            <li>+ Tổng tài sản cố định trong nhà máy của chi nhánh F1 đạt tối thiểu $30,000</li>
        
            <div className='subTitle'>- Phần thưởng</div>
            <li>+ Hoa hồng F1: 25%</li>
            <li>+ Hoa hồng F2: 8%</li>
            <li>+ Hoa hồng F3: 5%</li>
            <li>+ Tặng một máy khai thác $1,000</li>
            <li>+ Sức mạnh khai thác tăng 15%</li>
          </ul>
        </div>

        <div className='content-section'>
          <div className='title'>* Tập đoàn</div>
          <ul>
            <div className='subTitle'>- Điều kiện</div>
            <li>+ Tổng tài sản cố định trong nhà máy đạt tối thiểu $30,000</li>
            <li>+ Tổng tài sản cố định trong nhà máy của chi nhánh F1 đạt tối thiểu $100,000</li>
        
            <div className='subTitle'>- Phần thưởng</div>
            <li>+ Hoa hồng F1: 30%</li>
            <li>+ Hoa hồng F2: 8%</li>
            <li>+ Hoa hồng F3: 5%</li>
            <li>+ Tặng một máy khai thác $1,000</li>
            <li>+ Sức mạnh khai thác tăng 20%</li>
          </ul>
        </div>

        
        <div className='content-section'>
          <div className='title'># Ghi chú</div>
          <ul>
            <li>- Phần thưởng</li>
            <li>- Hoa hồng được nhận bằng đồng Fi .</li> 
            <li>- Phần thưởng hoa hồng được tính trên tổng số lượng Fi  khai thác được từ máy khai thác của chi nhánh.</li> 
            <li>- Tổng tài sản cố định là tổng giá trị ban đầu của máy khai thác mà bạn đã mua tại cửa hàng. Tất cả máy tặng không được cộng vào đây.</li> 
            <li>- Máy khai thác được tặng sẽ tự động thanh lý sau 360 ngày.</li> 
            <li>- Sức mạnh khai thác là khả năng khai thác vượt trội hơn so với sản lượng khai thác ban đầu của từng máy.</li>
          </ul>
        </div>
`

const en = `
<div className='content-section'>
<div className='title'>* MEMBERS</div>
<ul>
  <div className='subTitle'>- Condition</div>
  <li>+ Total fixed assets in the factory reach at least $100</li>

  <div className='subTitle'>- Reward</div>
  <li>+ F1 Commission: 10%</li>
  <li>+ F2 Commission: 8%</li>
  <li>+ F3 Commission: 5%</li>
</ul>
</div>

<div className='content-section'>
<div className='title'>* Household business</div>
<ul>
  <div className='subTitle'>- Condition</div>
  <li>+ Total fixed assets in the factory reach at least $1,000</li>
  <li>+ Total fixed assets in F1 branch's factory reach at least $5,000</li>

  <div className='subTitle'>- Reward</div>
  <li>+ F1 Commission: 15%</li>
  <li>+ F2 Commission: 8%</li>
  <li>+ F3 Commission: 5%</li>
  <li>+ Give away a $100 Miner</li>
  <li>+ Mining power increased by 5%</li>
</ul>
</div>

<div className='content-section'>
<div className='title'>* Company</div>
<ul>
  <div className='subTitle'>- Condition</div>
  <li>+ Total fixed assets in the factory reach at least $3,000</li>
  <li>+ Total fixed assets in the F1 branch's factory reach at least $10,000</li>

  <div className='subTitle'>- Reward</div>
  <li>+ F1 Commission: 20%</li>
  <li>+ F2 Commission: 8%</li>
  <li>+ F3 Commission: 5%</li>
  <li>+ Give away a $500 Miner</li>
  <li>+ Mining power increased by 10%</li>
</ul>
</div>

<div className='content-section'>
<div className='title'>* Business</div>
<ul>
  <div className='subTitle'>- Condition</div>
  <li>+ Total fixed assets in the factory reach at least $10,000</li>
  <li>+ Total fixed assets in F1 branch's factory reach at least $30,000</li>

  <div className='subTitle'>- Reward</div>
  <li>+ F1 Commission: 25%</li>
  <li>+ F2 Commission: 8%</li>
  <li>+ F3 Commission: 5%</li>
  <li>+ Give away a $1,000 mining machine</li>
  <li>+ Mining power increased by 15%</li>
</ul>
</div>

<div className='content-section'>
<div className='title'>* Group</div>
<ul>
  <div className='subTitle'>- Condition</div>
  <li>+ Total fixed assets in the factory are at least $30,000</li>
  <li>+ Total fixed assets in the factory of F1 branch reach at least $100,000</li>

  <div className='subTitle'>- Reward</div>
  <li>+ F1 Commission: 30%</li>
  <li>+ F2 Commission: 8%</li>
  <li>+ F3 Commission: 5%</li>
  <li>+ Give away a $1,000 mining machine</li>
  <li>+ Mining power increased by 20%</li>
</ul>
</div>


<div className='content-section'>
<div className='title'># Notes</div>
<ul>
  <li>- Reward</li>
  <li>- Commissions are received in Fi .</li>
  <li>- The commission reward is calculated on the total amount of Fi  mined from the affiliate's miner.</li>
  <li>- Total Fixed Assets is the total initial value of the mining machine that you bought at the store. All giveaways are not included here.</li>
  <li>- The donated miner will automatically liquidate after 360 days.</li>
  <li>- Mining power is the ability to mine more than the original mining output of each machine.</li>
</ul>
</div>
`

const cn = `
<div className='content-section'>
<div className='title'>* MEMBERS</div>
<ul>
  <div className='subTitle'>- Condition</div>
  <li>+ Total fixed assets in the factory reach at least $100</li>

  <div className='subTitle'>- Reward</div>
  <li>+ F1 Commission: 10%</li>
  <li>+ F2 Commission: 8%</li>
  <li>+ F3 Commission: 5%</li>
</ul>
</div>

<div className='content-section'>
<div className='title'>* Household business</div>
<ul>
  <div className='subTitle'>- Condition</div>
  <li>+ Total fixed assets in the factory reach at least $1,000</li>
  <li>+ Total fixed assets in F1 branch's factory reach at least $5,000</li>

  <div className='subTitle'>- Reward</div>
  <li>+ F1 Commission: 15%</li>
  <li>+ F2 Commission: 8%</li>
  <li>+ F3 Commission: 5%</li>
  <li>+ Give away a $100 Miner</li>
  <li>+ Mining power increased by 5%</li>
</ul>
</div>

<div className='content-section'>
<div className='title'>* Company</div>
<ul>
  <div className='subTitle'>- Condition</div>
  <li>+ Total fixed assets in the factory reach at least $3,000</li>
  <li>+ Total fixed assets in the F1 branch's factory reach at least $10,000</li>

  <div className='subTitle'>- Reward</div>
  <li>+ F1 Commission: 20%</li>
  <li>+ F2 Commission: 8%</li>
  <li>+ F3 Commission: 5%</li>
  <li>+ Give away a $500 Miner</li>
  <li>+ Mining power increased by 10%</li>
</ul>
</div>

<div className='content-section'>
<div className='title'>* Business</div>
<ul>
  <div className='subTitle'>- Condition</div>
  <li>+ Total fixed assets in the factory reach at least $10,000</li>
  <li>+ Total fixed assets in F1 branch's factory reach at least $30,000</li>

  <div className='subTitle'>- Reward</div>
  <li>+ F1 Commission: 25%</li>
  <li>+ F2 Commission: 8%</li>
  <li>+ F3 Commission: 5%</li>
  <li>+ Give away a $1,000 mining machine</li>
  <li>+ Mining power increased by 15%</li>
</ul>
</div>

<div className='content-section'>
<div className='title'>* Group</div>
<ul>
  <div className='subTitle'>- Condition</div>
  <li>+ Total fixed assets in the factory are at least $30,000</li>
  <li>+ Total fixed assets in the factory of F1 branch reach at least $100,000</li>

  <div className='subTitle'>- Reward</div>
  <li>+ F1 Commission: 30%</li>
  <li>+ F2 Commission: 8%</li>
  <li>+ F3 Commission: 5%</li>
  <li>+ Give away a $1,000 mining machine</li>
  <li>+ Mining power increased by 20%</li>
</ul>
</div>


<div className='content-section'>
<div className='title'># Notes</div>
<ul>
  <li>- Reward</li>
  <li>- Commissions are received in Fi .</li>
  <li>- The commission reward is calculated on the total amount of Fi  mined from the affiliate's miner.</li>
  <li>- Total Fixed Assets is the total initial value of the mining machine that you bought at the store. All giveaways are not included here.</li>
  <li>- The donated miner will automatically liquidate after 360 days.</li>
  <li>- Mining power is the ability to mine more than the original mining output of each machine.</li>
</ul>
</div>
`

export {
  cn, en, vi
}