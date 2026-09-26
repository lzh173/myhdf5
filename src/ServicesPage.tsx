import styles from './Services.module.css';
import LocalService from './services/LocalService';
import RemoteService from './services/RemoteService';

function ServicesPage() {
  return (
    <div className={styles.root}>
      <LocalService />
      <RemoteService />
      <section className={styles.disclaimer} aria-labelledby="disclaimer-title">
        <h2 id="disclaimer-title">免责声明</h2>
        <p>
          本服务基于 <strong>myHDF5</strong> 的 MIT
          开源代码汉化部署，仅供学习交流，作者不对使用本服务造成的任何损失负责。
        </p>
        <ol>
          <li>
            <strong>非商业用途：</strong>
            网页输出的任何内容，禁止用于商业用途。
          </li>
          <li>
            <strong>合规使用：</strong>
            禁止在本服务加载任何违反你所在国家和地区法律法规的文件或数据集，禁止加载未公开的数据集或文件。
          </li>
          <li>
            <strong>数据与隐私：</strong>
            <ul>
              <li>
                本服务为纯前端静态部署，不会主动收集、存储或上传您的任何原始数据或生成结果。所有处理均在您的浏览器本地完成。
              </li>
              <li>
                请勿上传包含个人隐私、商业秘密或国家秘密的文件。因您加载的内容导致的任何隐私泄露或法律责任，由您自行承担。
              </li>
            </ul>
          </li>
          <li>
            <strong>衍生作品归属：</strong>
            <ul>
              <li>
                基于本项目衍生出的图像或已修改数据文件，其版权和处置权归原始数据所有者或创作者所有。
              </li>
              <li>
                本服务不对用户生成内容的版权归属做出任何承诺或担保。用户需自行确保其拥有处理该数据的合法权利。
              </li>
            </ul>
          </li>
          <li>
            <strong>服务可用性与稳定性：</strong>
            <ul>
              <li>
                本服务依托于第三方平台（如
                Cloudflare）提供托管，不保证服务绝对稳定、无中断或无误。
              </li>
              <li>
                因网络波动、平台政策调整、不可抗力或技术故障导致的服务中断、数据丢失，本服务不承担任何责任。
              </li>
            </ul>
          </li>
          <li>
            <strong>禁止滥用：</strong>
            <ul>
              <li>
                禁止利用本服务进行任何恶意攻击、爬虫抓取、资源滥用或干扰其他用户正常使用的行为。
              </li>
              <li>
                严禁将本服务用于任何违反国际法、战争罪、反人类罪或侵犯人权的活动。
              </li>
            </ul>
          </li>
          <li>
            <strong>责任豁免：</strong>
            使用者需自行承担因使用本服务而产生的所有风险。对于因使用或无法使用本服务而导致的任何直接、间接、偶然、特殊或后果性损害（包括但不限于利润损失、数据丢失、业务中断），本服务作者及原项目开发者概不负责。
          </li>
          <li>
            <strong>协议变更与解释权：</strong>
            <ul>
              <li>本免责声明的最终解释权归本服务维护者所有。</li>
              <li>
                本服务维护者有权随时修改、更新本免责声明，修改后的条款将在本页面公布后立即生效。
              </li>
            </ul>
          </li>
        </ol>
      </section>
    </div>
  );
}

export default ServicesPage;
