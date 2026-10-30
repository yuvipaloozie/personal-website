import Image from "next/image";
import type { ReactNode } from "react";

const references = [
  { authors: "Khaligh-Razavi & Kriegeskorte", year: "2014", title: "Deep supervised, but not unsupervised, models may explain IT cortical representation", journal: "PLOS Computational Biology", url: "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1003915" },
  { authors: "Cichy et al.", year: "2016", title: "Comparison of deep neural networks to spatio-temporal cortical dynamics of human visual object recognition reveals hierarchical correspondence", journal: "Scientific Reports", url: "https://doi.org/10.1038/srep27755" },
  { authors: "Hubel & Wiesel", year: "1962", title: "Receptive fields, binocular interaction and functional architecture in the cat’s visual cortex", journal: "The Journal of Physiology", url: "https://doi.org/10.1113/jphysiol.1962.sp006837" },
  { authors: "Fukushima", year: "1980", title: "Neocognitron: A self-organizing neural network model for a mechanism of pattern recognition unaffected by shift in position", journal: "Biological Cybernetics", url: "https://pubmed.ncbi.nlm.nih.gov/7370364/" },
  { authors: "Kietzmann et al.", year: "2019", title: "Recurrence is required to capture the representational dynamics of the human visual system", journal: "PNAS", url: "https://doi.org/10.1073/pnas.1905544116" },
  { authors: "LeCun et al.", year: "1998", title: "Gradient-based learning applied to document recognition", journal: "Proceedings of the IEEE", url: "https://leon.bottou.org/papers/lecun-98h" },
  { authors: "Olshausen & Field", year: "1996", title: "Emergence of simple-cell receptive field properties by learning a sparse code for natural images", journal: "Nature", url: "https://doi.org/10.1038/381607a0" },
  { authors: "Güçlü & van Gerven", year: "2015", title: "Deep neural networks reveal a gradient in the complexity of neural representations across the ventral stream", journal: "The Journal of Neuroscience", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6605414/" },
  { authors: "Dumoulin & Wandell", year: "2008", title: "Population receptive field estimates in human visual cortex", journal: "NeuroImage", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3073038/" },
  { authors: "Kriegeskorte, Mur & Bandettini", year: "2008", title: "Representational similarity analysis: Connecting the branches of systems neuroscience", journal: "Frontiers in Systems Neuroscience", url: "https://doi.org/10.3389/neuro.06.004.2008" },
];

function Cite({ n }: { n: number }) {
  return <sup className="cnn-cite"><a href={`#cnn-ref-${n}`} aria-label={`Reference ${n}: ${references[n - 1].authors}`}>[{n}]</a></sup>;
}

function Equation({ label, children }: { label: string; children: ReactNode }) {
  return <div className="cnn-equation"><math display="block" aria-label={label}>{children}</math></div>;
}

function ResearchFigure({ src, width, height, alt, children }: { src: string; width: number; height: number; alt: string; children: ReactNode }) {
  return (
    <figure className="cnn-research-figure">
      <a className="cnn-figure-image-link" href={src} target="_blank" rel="noreferrer" aria-label={`Open full-size research figure: ${alt}`}>
        <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 800px) 100vw, 760px" />
      </a>
      <figcaption>{children} <a href={src} target="_blank" rel="noreferrer">View full size</a>.</figcaption>
    </figure>
  );
}

export default function CnnVisionArticle() {
  return (
    <div className="cnn-article">
      <p>A network trained to categorize photographs can develop internal representations that resemble those measured in the human visual cortex. Researchers have tested this correspondence using brain imaging and recordings that track visual processing over milliseconds.<Cite n={1} /><Cite n={2} /> What interests me is that learning to recognize pictures can produce features that also help explain biological measurements. Both systems have to extract useful structure from changing images. Following that problem from a single edge to a recognizable object makes several CNN design choices easier to understand.</p>

      <h2>Start with what a visual neuron responds to</h2>
      <p>A neuron in primary visual cortex, V1, responds to a limited part of the visual scene: its <strong>receptive field</strong>. In classic cat experiments, Hubel and Wiesel found simple cells that preferred a bar or edge at a particular orientation and position. Complex cells could retain their preference across a wider range of positions within their receptive fields.<Cite n={3} /> That suggests two useful operations: detect a local pattern, then preserve its identity as it moves slightly. Fukushima explicitly built this simple-cell/complex-cell distinction into the neocognitron, an early predecessor of modern CNNs.<Cite n={4} /> A simplified local detector can be written as:</p>
      <Equation label="r sub k equals phi of the sum over pixels p of w sub k p times I sub p, plus b sub k.">
        <msub><mi>r</mi><mi>k</mi></msub><mo>=</mo><mi>φ</mi><mo>(</mo>
        <munder><mo>∑</mo><mi>p</mi></munder>
        <msub><mi>w</mi><mrow><mi>k</mi><mi>p</mi></mrow></msub><msub><mi>I</mi><mi>p</mi></msub><mo>+</mo><msub><mi>b</mi><mi>k</mi></msub><mo>)</mo>
      </Equation>
      <p>The image values are <i>I</i>, and <i>p</i> indexes pixels in a local patch. The weights <i>w</i> specify which arrangement of light and dark activates detector <i>k</i>. The sum combines those pixels, <i>b</i> sets an offset, and <i>φ</i> supplies a nonlinear response. Positive and negative weights let different parts of the patch raise or lower the response. A nonlinearity can, for example, suppress responses below a threshold. This is the filter-and-nonlinearity computation used by a CNN. Applied to a cortical neuron, it is a functional approximation of its sensory response. Real neurons also depend on time, surrounding activity, and their recent history.<Cite n={3} /><Cite n={5} /></p>
      <ResearchFigure src="/images/blog/cnn-vision/cichy-2016-filters.jpg" width={1200} height={1030} alt="Published CNN architecture with local filters in its first layer and weighted connections between subsequent layers.">
        <strong>Local filters feed a hierarchy.</strong> The small patches in the lower panel show first-layer filters. Colored paths trace selected connections through the network. Cichy et al. (2016), Fig. 1.<Cite n={2} /> Reproduced unchanged under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
      </ResearchFigure>

      <h2>Keep the feature as its position changes</h2>
      <p>A CNN reuses each filter across the image. This <strong>weight sharing</strong> encodes the assumption that a useful edge detector should work at many locations. Pooling then combines responses from nearby positions.<Cite n={6} /></p>
      <Equation label="p sub k equals the maximum of r sub k at delta, over positions delta in the neighborhood N.">
        <msub><mi>p</mi><mi>k</mi></msub><mo>=</mo>
        <munder><mi mathvariant="normal">max</mi><mrow><mi>δ</mi><mo>∈</mo><mi>N</mi></mrow></munder>
        <msub><mi>r</mi><mi>k</mi></msub><mo>(</mo><mi>δ</mi><mo>)</mo>
      </Equation>
      <p>Here, <i>N</i> is a small neighborhood and <i>δ</i> indexes positions within it. For a simple numerical example, suppose the nearby responses are 0.2, 0.8, and 0.3. Max pooling keeps 0.8. If the feature moves slightly and its strongest response stays within that neighborhood, the pooled value can stay the same. We retain evidence that the feature is present while discarding some information about its exact position.</p>
      <p>This resembles the position tolerance of complex cells at the level of function. Biological complex cells need not compute a literal maximum, and cortical neurons do not share exactly identical weights across the visual field. The correspondence concerns a useful computation, with important differences in implementation.<Cite n={3} /><Cite n={4} /></p>

      <h2>Why edge-like filters emerge in the first place</h2>
      <p>Natural images contain repeated structure: boundaries, contours, and changes in texture. Olshausen and Field trained a model to represent natural scenes while favoring sparse activity, meaning relatively few active coefficients for each image. It developed localized, oriented filters sensitive to particular spatial scales, resembling V1 simple-cell receptive fields.<Cite n={7} /> Their sparse-coding model provides evidence for a broader idea: constraints on representing the same visual world can lead biological and artificial systems toward similar solutions. The resemblance can arise through learning, even when individual edge detectors are not specified in advance.</p>
      <p>In CNN training, random initialization and sampled batches affect the route through optimization. The architecture, training data, and objective constrain what can be learned. The objective defines what counts as a good solution. Once trained, a standard feedforward CNN applies a fixed sequence of learned operations to its input.<Cite n={6} /> Different runs can learn different filters, so biological alignment still needs measurement.</p>

      <h2>From a filter hierarchy to a cortical hierarchy</h2>
      <p>The ventral visual pathway supports object recognition through interconnected regions, including V1, V2, V4, and inferior temporal cortex, or IT. Across stages, responses can depend on larger regions and more complex combinations of image features.<Cite n={8} /> Functional MRI, or fMRI, estimates brain activity through changes in blood oxygenation. Human fMRI supports the receptive-field part of this account: Dumoulin and Wandell found that population receptive fields generally increased from V1 to V3 at comparable visual-field positions. These measurements describe groups of neurons, rather than individual cells.<Cite n={9} /></p>
      <p>In a two-participant fMRI study, Güçlü and van Gerven found a gradient in which progressively higher CNN layers best predicted responses in progressively higher ventral-stream regions.<Cite n={8} /> Cichy and colleagues extended the comparison using 118 images and 15 participants. Lower layers aligned mainly with posterior visual regions, while higher layers also aligned with more anterior regions. Magnetoencephalography, or MEG, measures magnetic signals associated with neural activity and offers much finer timing. MEG measurements showed an overall tendency for higher-layer correspondence to peak later, with departures from a strict layer-by-layer ordering.<Cite n={2} /></p>
      <ResearchFigure src="/images/blog/cnn-vision/cichy-2016-cortex.jpg" width={1200} height={1542} alt="Cortical surface maps for eight CNN layers. Early layers correspond mainly to posterior visual areas; later layers extend into temporal and parietal regions.">
        <strong>The alignment has a spatial pattern.</strong> These maps show similarity between image representations in CNN layers and human brain measurements. Color scales differ across panels. Cichy et al. (2016), Fig. 4.<Cite n={2} /> Reproduced unchanged under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
      </ResearchFigure>

      <h2>How do you compare a brain with a network?</h2>
      <p>Matching every artificial unit to a biological neuron would be difficult. <strong>Representational similarity analysis</strong> instead asks whether the two systems organize the same images in similar ways.<Cite n={10} /> For each image, collect a response vector: activity across measured brain locations, or activations across model units. A common measure of how differently two images are represented is correlation distance:</p>
      <Equation label="d sub i j equals one minus the correlation between response vectors v sub i and v sub j.">
        <msub><mi>d</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mo>=</mo><mn>1</mn><mo>−</mo><mi mathvariant="normal">corr</mi><mo>(</mo><msub><mi>v</mi><mi>i</mi></msub><mo>,</mo><msub><mi>v</mi><mi>j</mi></msub><mo>)</mo>
      </Equation>
      <p>Suppose two face photographs produce similar response patterns, while a chair produces a different pattern. The distances record those relationships. Repeating this for every image pair gives a <strong>representational dissimilarity matrix</strong>, or RDM. We can then ask whether the brain and network make similar distinctions across the image set, even though their individual units differ.<Cite n={10} /></p>
      <p>Khaligh-Razavi and Kriegeskorte compared 37 model representations with human and monkey IT data. The strongly supervised CNN best captured IT structure among the tested models. Its later layers came closer than its early layers, although extra feature remixing and reweighting were needed to reach the estimated human-data noise ceiling.<Cite n={1} /></p>
      <ResearchFigure src="/images/blog/cnn-vision/khaligh-razavi-2014-it.png" width={4131} height={4655} alt="Bar chart comparing CNN layers with human IT representational geometry. Later layers correlate more strongly; fitted readouts approach or enter the gray noise-ceiling range.">
        <strong>Similarity can be quantified.</strong> Bars measure agreement with human IT. The gray band estimates the best achievable agreement given measurement noise. The final bars include additional fitted transformations. Khaligh-Razavi and Kriegeskorte (2014), Fig. 7.<Cite n={1} /> Reproduced unchanged under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
      </ResearchFigure>
      <p>It is tempting to read a high correlation as evidence that the brain and network work the same way. Here, the claim is narrower: they organize this set of images similarly. The fitted readout matters too, because it changes the model’s representation to improve that match.</p>

      <h2>The next mechanism is feedback</h2>
      <p>A feedforward CNN passes information forward through its layers. Visual cortex also sends signals sideways and back toward earlier regions. Recognition therefore unfolds through repeated interactions. Kietzmann and colleagues measured changing representations across human ventral-stream regions. Recurrent networks with lateral and top-down connections captured these dynamics better than parameter-matched feedforward models. Their virtual cooling experiments selectively disabled connections in the models, revealing how those connections contributed to the match.<Cite n={5} /></p>
      <p>This is what I find useful about the comparison. A model gives us explicit operations whose consequences we can inspect and test. Local filtering, position tolerance, and hierarchy already help explain some of the structure in visual-cortex measurements. Feedback gives us a concrete next mechanism to investigate, while the remaining differences keep the problem open. We can move from an engineering choice to a scientific question about why that choice works, then ask what experiment would distinguish it from another explanation. Some of the ideas that make a CNN useful are already at work in the way we see.</p>

      <section className="cnn-references" aria-labelledby="cnn-references-title">
        <h2 id="cnn-references-title">References</h2>
        <ol>
          {references.map((ref, i) => <li id={`cnn-ref-${i + 1}`} key={ref.url} tabIndex={-1}>
            {ref.authors} ({ref.year}). <a href={ref.url}>{ref.title}</a>. <cite>{ref.journal}</cite>.
          </li>)}
        </ol>
      </section>
    </div>
  );
}
